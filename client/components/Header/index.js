import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../providers/auth';

export default (props) => {
  const router = useRouter();
  const { logout } = useAuth();

  const onLogout = e => {
    e.preventDefault();
    logout();
    router.push('/logout');
    return false;
  }

  const menu = [
    { href: 'https://www.carelulu.com/', label: 'Home', auth: 'guest' },
    { href: '/login', label: 'Login', auth: false },
    { href: '/register', label: 'Sign Up', auth: false },
    { href: 'https://www.carelulu.com/contact-us/', label: 'Contact Us', auth: 'guest' },
    { href: '/logout', label: 'Logout', auth: true },
  ];

  const LogoutButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        Logout
      </a>
    )
  })

  const dropdownMenu = menu.map(item => {
    if ((item.auth == 'guest') || (item.auth == props.auth)) {
      if (item.href != '/logout') {
        return <Link key={item.label} href={item.href}>{item.label}</Link>;
      }
      return (
        <Link key={item.label} href={item.href} passHref>
          <LogoutButton onClick={onLogout} />
        </Link>
      );
    }
    return null;
  });

  return (
    <header>
      <div data-class="header-menu-teal"
        className="css-1dbjc4n r-1habvwh r-q335y2 r-6koalj r-18u37iz r-1w6e6rj r-1h0z5md r-16lhzmz r-1qfoi16 r-glunga r-13qz1uu r-mhe3cw">
        <div data-class="" className="css-1dbjc4n r-1habvwh r-6koalj r-18u37iz r-1w6e6rj r-1777fci r-13qz1uu">
          <div data-class="limited"
            className="css-1dbjc4n r-1habvwh r-6koalj r-13awgt0 r-18u37iz r-1w6e6rj r-tmtnm0 r-1wtj0ep r-uwe93p">
            <div data-class=" col-xs-6 col-sm-6 col-md-6 col-lg-6" className="css-1dbjc4n">
              <a
                href="https://www.carelulu.com/" dir="auto" role="link" data-class=" gray"
                className="css-4rbku5 css-18t94o4 css-901oao r-ogrl0h r-n6v787 r-eu3ka r-qvk6io r-u28ne4"
                data-font="">
                <div data-class="image-outer-wrapper">
                  <img alt="" data-class="intrinsic " width="122" height="40"
                    src="https://c2zyebdn.cloudimg.io/s/cdn/x/https://divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png"
                    layout="intrinsic"
                    className="i-amphtml-element i-amphtml-layout-intrinsic i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout"
                    i-amphtml-layout="intrinsic" />
                </div>
              </a>
            </div>
            <div data-class="Header__ampMenuColumn col-xs-150 col-sm-150 col-md-150 col-lg-150"
                className="css-1dbjc4n r-1mnahxq" data-css-2="">
                <div width="auto" height="300" layout="fixed-height" credentials="include"
                  src="https://api.carelulu.com/api/webhook/amp?url=AMPDOC_URL&amp;_=RANDOM"
                  className="i-amphtml-element i-amphtml-layout-fixed-height i-amphtml-layout-size-defined i-amphtml-built i-amphtml-layout"
                  i-amphtml-layout="fixed-height"
                  style={{ height: "300px", "--loader-delay-offset": "175ms !important" }}>
                  <template type="amp-mustache"></template>
                  <div role="list" className="i-amphtml-fill-content i-amphtml-replaced-content">
                    <div className="Header__ampMenu Header__ampMenuTeal" role="listitem">
                      <div className="Header__ampLabel">
                        <span>Menu</span>
                        <svg viewBox="0 0 20 20" width="20" height="20" fill="#FFFFFF">
                          <path
                            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z">
                          </path>
                        </svg>
                      </div>
                      <div className="Header__ampOptions">
                        {dropdownMenu}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </header>
  )
}