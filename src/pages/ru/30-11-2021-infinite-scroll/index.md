---
path: "/ru/infinite-scroll"
date: "30/11/2021"
title: "Как создать бесконечный скролл используя Rails"
lang: "ru"
tags: ['rails', 'ruby', 'infinite-scroll', 'intersection-observer', 'stimulus', 'vladf', 'Vlad Filiucov']
excerpt: "Бесконечный скролл на Ruby on Rails"
---

![Infinity image](./infinity.jpg)

## Бесконечный скролл

Недавно скроллил ленту соцсети и задумался, как бы я реализовал бесконечный скролл если бы завтра возникла такая задача. Оставил заметку попробовать в следующий промежуток времени выделенный на обучение. Записываю свой вариант и мысли по дальнейшему улучшению. Обучение было посвещено Rails - отсюда и выбор технологий.

### Что же такое бесконечный/непрерывный скролл?

Как говорит вебсайт [ui-patterns](http://ui-patterns.com/patterns/ContinuousScrolling) решаемая проблема:

> Пользователю нужно увидеть подмножество данных, которые не легко вывести но одной странице. Контент должен быть представлен пользователям как гораздо больший, кажущийся бесконечным набор данных, который можно потреблять не прилагая усилий.

Испрользовать когда:
- Данных больше, чем помещается на обычной странице.
- Навигация на следующую страницу отнимает слишком много внимания от контента.

### Используемые версии

 - Ruby on Rails 6.1
 - Stimulus 3.0.1

### Подготовка данных:

Создайте приложение на Rails и настройте базу данных. Создаем скафолд со статьями, но если у Вас уже есть таблица в базе - используйте ее. В терминале:

```bash

$ rails g scaffold Post name:string title:string content:text && rails db:migrate RAILS_ENV=development
```
Это создало таблицу в базе данных с полями `name`, `title` и `content`.

Теперь давайте создадим записи в базе, что-бы нам было через что скролить. Откройте Rails консоль

```bash

$ rails c
```

и сгенерируйте достаточне количество записей

```ruby

> 100.times { |idx| Post.create(name: 'My post', title: idx, content: "post number #{idx + 1}") }
```

### Подготовка видов:

Создадим паршал (partial) постов

> app/views/posts/_posts.html.erb

И выведем посты

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

Подключим паршал в вид индекс

> app/views/posts/index.html.erb

```ruby

<%= render "posts" %>
```

Note that this works thanks to instance variable setting that scaffold generator did for us in posts_controller.
Now let's make each post entry take a bit more space on the screen. Note that "post-div" css class in partial. Let's add some height and border to it.

Уточню, что это работает благодаря инстанс переменным, которые скафолд установил для нас в posts_controller.
Теперь изменим посты что-б каждый пост занимал больше места на экране. Обратите внимание "post-div" css-класс, который мы добавили в паршале. Добавим классу высоты и рамку.

>  app/assets/stylesheets/application.scss

```css

.post-div {
  border: 1px solid black;
  margin: 32px;
}
```

...уродливо. Но мы не стилизацией пришли сюда заниматся, так-что продолжим.

### "Пачкование" или "кучкование" данных:

Что дальше? Сейчас мы выводим все посты разом, но для бесконечного срколла нам нужно выводить их пачками. Один из способов сгрупировать посты это использовать пагинацию. Откроем Гемфайл и добваим гем [Pagy](https://github.com/ddnexus/pagy) реализующий пагинацию.

> Gemfile

```ruby

gem "pagy", "~> 3.5"
```

и установим гем. В терминале введем:

```bash

$ bundle install
```

и подключем гем в контроллере постов

> app/controllers/posts_controller.rb

```ruby

class PostsController < ApplicationController
  include Pagy::Backend
  ...

  def index
    @pagy, @posts = pagy(Post.all)
  end
```

и во вью

> app/views/posts/index.html.erb

```ruby

<%== pagy_nav(@pagy) %>
```

Если мы взглянем на страницу постами сейчас - посты выводятся с пагинацией.

### Подключем JavaScript

Мы подготовиди данные и теперь хотим подгружать больше постов без перезагрузки страницы. Значит пришло время джава скрипта. Давайте настроим Стимулус и поместим всю логику бесконечного скрола в стимулус контроллер. В терминале:

```bash

> yarn add stimulus

> bundle exec rails webpacker:install:stimulus
```

Это сегенерирует "app/javascript/controllers/" директорию и подключит джаваскрипт к приложению.

Подключим джавасриптовый контроллер, который мы еще не создали к вью.

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

Подготовительный код для контроллера. В директории джавасриптовых контроллеров создайте "infinite_scroll_controller"

> app/javascript/controllers/infinite_scroll_controller.js

```js


import { Controller } from "stimulus"
import Rails from '@rails/ujs';

export default class extends Controller {
  static targets = ["entries", "pagination"]
}
```

### Когда нам подгружать больше постов?

В первой реализации я использовал браузерное событие скролла и подсчитывал если последний пост бы в области видимости. Это добавляло частые, относительно сложные вычисления. Само собой, нам следует оптимизировать только когда, кто-то ощущает эту "боль". В целях обучения я пошел чуть дальше и начал проверять если подвал сейта в области видимости, так-как скорее всего это момент, когда нужно подгрузить еще постов и заменил вычисления на [Intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Если Вы поддерживаете старые браузеры - Вам понадобится полифил - т.к обзервер никогда не будет поддерживаться, например, в том-же IE.

В главном лэйауте создадим подвал сайта "приклеинный" ко дну страницы.

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

"приклеим" его используя css

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

### Время бесконечного скролла:

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

So if requests is for html format - we return server side generated page as normal. If request is for JSON format (aka our async loadData function) - we return posts partial as as string and provide updated pagincation context.

That's it. Infinite scroll should be working now when footer is in the view. Newly loaded posts push footer out of view, and we have to scroll to the bottom to request more posts.

### Next steps:

I stopped here - but next step to further optimize it could be removing initial posts as we move further down the page. As having large DOM will get expensive to user quickly.

Thank you for reading. Happy hacking :)
