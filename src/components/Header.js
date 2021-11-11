import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
// import letterV from '../../images/letter-v.svg';
// import SelectLanguage from './SelectLanguage';
// import './Header.css';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

export default function WithSubnavigation({ data, localeData }) {
  const { isOpen, onToggle } = useDisclosure();
  const { homeLink, showLangs } = localeData;
  const rootAddress = homeLink === '' ? '/' : homeLink;

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <GatsbyLink to={rootAddress} >
              Home
            </GatsbyLink>
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav localeData={localeData} />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav localeData={localeData} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ localeData }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const navItems = getNavItems(localeData);

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ localeData }) => {
  const navItems = getNavItems(localeData);

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const getNavItems = (localeData) => {
  const { langsMenu, homeLink, showLangs } = localeData;
  const rootAddress = homeLink === '' ? '/' : homeLink;
  const { about, portfolio, tags, mainHeading } = localeData.messages;
  const aboutLink = `${homeLink}/about`;
  const portfolioLink = `${homeLink}/portfolio`;
  const tagsLink = `${homeLink}/tags`;

  const NAV_ITEMS = [
    // {
    //   label: 'Multi level nav',
    //   children: [
    //     {
    //       label: 'example in',
    //       subLabel: 'case that',
    //       href: '#',
    //     },
    //     {
    //       label: 'I need it',
    //       subLabel: 'at some point',
    //       href: '#',
    //     },
    //   ],
    // },
    {
      label: tags,
      href: tagsLink,
    },
    {
      label: portfolio,
      href: portfolioLink,
    },
    {
      label: about,
      href: aboutLink,
    },
  ];

  return NAV_ITEMS;
};

// const Header = ({ data, localeData }) => {
//   const { title, description } = data.site.siteMetadata;
//   const { langsMenu, homeLink, showLangs } = localeData;
//   const rootAddress = homeLink === '' ? '/' : homeLink;
//   const { about, portfolio, tags, mainHeading } = localeData.messages;
//   const aboutLink = `${homeLink}/about`;
//   const portfolioLink = `${homeLink}/portfolio`;
//   const tagsLink = `${homeLink}/tags`;

//   return (
//   );

  // return (
  //   <header>
  //     <nav>
  //       <div className="logo nav-item">
  //         <Link to={rootAddress} >
  //           <img src={letterV} alt="Vlad Filiucov logo" />
  //         </Link>
  //         <Link to={rootAddress} className='pagetitlelink'>
  //           <span>
  //             VLADF
  //           </span>
  //         </Link>
  //       </div>
  //       <div className="nav-item">
  //         <Link to={aboutLink} >
  //           {about}
  //         </Link>
  //       </div>
  //       <div className="nav-item">
  //         <Link to={portfolioLink} className="nav-item">
  //           {portfolio}
  //         </Link>
  //       </div>
  //       <div className="nav-item">
  //         <Link to={tagsLink} className="nav-item">
  //           {tags}
  //         </Link>
  //       </div>
  //     </nav>
  //     <h1>{mainHeading}</h1>
  //     <SelectLanguage langs={langsMenu} showLangs={showLangs} />
  //   </header>
  // );
// };

// export default Header;

