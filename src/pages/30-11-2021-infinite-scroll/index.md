---
path: "/infinite-scroll"
date: "30/11/2021"
title: "How to create infinite scroll using Ruby on Rails"
lang: "en"
tags: ['rails', 'ruby', 'infinite-scroll', 'intersection-observer', 'stimulus', 'vladf', 'Vlad Filiucov']
excerpt: "Infinite scroll using Ruby on Rails"
---

![Infinity image](./infinity.jpg)

## Infinite scroll

Was scrolling some social media feed and suddenly had a thought about how could I implement it if asked tomorrow. Made a note to give it a try in next level-up time slot. And fast forward - here we are. Writing down my variant and some thoughts on improvement. Level-up time was allocated for Rails - hence the technology choise.

### So what is infinite/continues scroll?

According to [ui-patterns website](http://ui-patterns.com/patterns/ContinuousScrolling) problem is:

> The user needs to view a subset of data that is not easily displayed on a single page Content needs to be presented to users as a subset of a much larger seemingly endless set, in a way that will aid them in consuming content without effort.

And it's supposed to be used when
- there are more data to show than what would fit on a normal page
- navigating to a second page of data takes away too much attention from the content

### Versions used:

 - Rails version 6.1
 - Stimulus 3.0.1

### Data setup:

Spin up a rails app with DB. If you already have data that you want to display paginated - use it. If not - let's create posts scaffold. In terminal:

```bash

$ rails g scaffold Post name:string title:string content:text && rails db:migrate RAILS_ENV=development
```
This will create table in database that has `name`, `title` and `content`.

Now let's create a bunch of entries so we have something to apply infinite scroll to. Open up rails console

```bash

$ rails c
```

and generate large enough number of entries

```ruby

> 100.times { |idx| Post.create(name: 'My post', title: idx, content: "post number #{idx + 1}") }
```

### View setup:

Now let's create posts partial

> app/views/posts/_posts.html.erb

And render posts inside

```ruby

<% @posts.each do |post| %>
  <div class='post-div'>
    <div><%= post.name %></div>
    <div><%= post.title %></div>
    <div><%= post.content %></div>
    <div><%= link_to 'Show', post %></div>
    <div><%= link_to 'Edit', edit_post_path(post) %></div>
    <div><%= link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' } %></div>
  </div>
<% end %>
```

And let's render this partial inside index view

> app/views/posts/index.html.erb

```ruby

<%= render "posts" %>
```

Note that this works thanks to instance variable setting that scaffold generator did for us in posts_controller.
Now let's make each post entry take a bit more space on the screen. Note that "post-div" css class in partial. Let's add some height and border to it.

>  app/assets/stylesheets/application.scss

```css

.post-div {
  border: 1px solid black;
  margin: 32px;
}
```

...that's ugly. But styling is out of scope here so let's move on.

### Data chuncking:

So what's next? Well now we are rendering all the posts at once but infinite scroll is supposed to be loading posts in chuncks. One way we can get that scoping for posts is by using pagination. So let's jump to the Gemfile and add a [Pagy](https://github.com/ddnexus/pagy) pagination gem.

> Gemfile

```ruby

gem "pagy", "~> 3.5"
```

and install gem. In terminal run:

```bash

$ bundle install
```

And use it in posts controller

> app/controllers/posts_controller.rb

```ruby

class PostsController < ApplicationController
  include Pagy::Backend
  ...

  def index
    @pagy, @posts = pagy(Post.all)
  end
```

and in view file

> app/views/posts/index.html.erb

```ruby

<%== pagy_nav(@pagy) %>
```

So now if we go back to our view - posts are paginated.

### Connect JavaScript

We've arranged all the data, now we want to load more posts - without reloading the page. So it's javascript time. Let's setup stimulus so we store all infinite scroll logic in stimulus controller. So head over to terminal and run:

```bash

> yarn add stimulus

> bundle exec rails webpacker:install:stimulus
```

This will generate "app/javascript/controllers/" directory for us and wire up js setup.

Now let's connect js controller that we haven't created yet to our view.

> app/views/posts/index.html.erb

```ruby

<div data-controller="infinite-scroll">
  <div data-infinite-scroll-target="entries">
    <%= render "posts" %>
  </div>

  <div data-infinite-scroll-target="pagination">
    <%== pagy_nav(@pagy) %>
  </div>
</div>
```

and boilerplate for controller. In js controller directory create "infinite_scroll_controller"

> app/javascript/controllers/infinite_scroll_controller.js

```js


import { Controller } from "stimulus"
import Rails from '@rails/ujs';

export default class extends Controller {
  static targets = ["entries", "pagination"]
}
```

### When should we load more posts?

In first implementation I used scroll event and calcualted if last post is in view from window view. But that was firing a lot of event with some complex computations. Obviously we should be optimising only when someone is really feeling the pain (and that def not the case here). But for learning experience I went a bit further and decided to look if footer is in view (as that's probably moment when we want to load more posts). And picked [Intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to watch footer for me. If you are supporting older browsers you might need a polyfill to get it working as it will probably never be supported at least in IE.

So, let's go to our layout, and create a main section and sticky footer so it's always at the botom.

```ruby

  <body>
    <main>
      <%= yield %>
    </main>

    <footer>
      I'm footer
    </footer>
  </body>
```

And make it sticky using css

> app/assets/stylesheets/application.scss

```css

main {
  min-height: calc(100vh - 70px);
}

footer {
  height: 50px;
  background-color: teal;
}
```

### Infinite scroll time wooooo:

So now we want to setup our controller. Here is code. Let's break it down

> app/javascript/controllers/infinite_scroll_controller.js

```javascript

export default class extends Controller {
  static targets = ["entries", "pagination"]

  initialize() {
    this.footer = document.querySelector('footer');
    this.intersectionObserver = new IntersectionObserver(entries => this.processIntersectionEntries(entries))
  }
  connect() {
    this.intersectionObserver.observe(this.footer)
  }
  disconnect() {
    this.intersectionObserver.unobserve(this.footer)
  }

  processIntersectionEntries(entries) {
    entries.forEach(entry => {
      // fetch new posts only when footer is getting into view port
      if (entry.intersectionRatio > 0){
        const url = this.paginationTarget.querySelector("a[rel='next']")?.href
        if (url) this.loadMore(url);
      }
    }, { threshold: 1 })
  }

  loadMore(url) {
    Rails.ajax({
      type: 'GET',
      url,
      dataType: 'json',
      success: (data) => {
        this.entriesTarget.insertAdjacentHTML('beforeend', data.entries);
        this.paginationTarget.innerHTML = data.pagination;
      }
    });
  }
}
```

1. In "initialize" function we're finding footer component and connecting intersction observer to the page.
1. "connect" and "disconnect" are telling intersection observer to watch and unwatch footer.
1. "processIntersectionEntries" is checking if footer got into view. If it did - it finds link to next page (rel "next" attribute is something that [Pagy](https://github.com/ddnexus/pagy) gives us) and supplies next page link to "loadMore"  function.
1. "loadMore" function makes an async request to the same page, but requests response in json format. If it got more data it appends new data to end of currently displayed posts and updates pagination navigation state.

And last step is connecting backend to our "loadMore" function. So lets head to our posts_controller index action:

> app/controllers/posts_controller.rb

```ruby

  def index
    @pagy, @posts = pagy(Post.all)

    respond_to do |format|
      format.html
      format.json {
        render json: {
          entries: render_to_string(partial: "posts", formats: [:html]),
          pagination: view_context.pagy_nav(@pagy)
        }
      }
    end
  end
```

So if requests is for html format - we return server side generated page as normal. If request is for JSON format (aka our async loadData function) - we return posts partial as string and provide updated pagincation context.

That's it. Infinite scroll should be working now when footer is in the view. Newly loaded posts push footer out of view, and we have to scroll to the bottom to request more posts.

### Next steps:

I stopped here - but next step to further optimize it could be removing initial posts as we move further down the page. As having large DOM will get expensive to user quickly.

Thank you for reading. Happy hacking :)
