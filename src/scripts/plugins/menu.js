import { $body, $win, $doc } from '@/utils/doms';

const classes = {
  header: '.header',
  activeHeader: 'active-header',
  activeHeaderMobile: 'active-header-mobile',
  headerBurger: '.header__burger',
  activeSearch: 'open-search',
  activeModal: 'open-modal',
  headerSearch: '.search',
  searchForm: '.search__form',
  iconSearch: '.search__icon',
  btnBook: '.btn-book',
  btnBookMobile: '.header__tools-book',
  headerBook: '.header__button',
  activeBook: 'open-book',
  scrolled: 'scrolled',
  clearSearch: '.search__form-clear',
  inputSearch: '.search__form-input',
  iconSearchMobile: '.search-mobile',
  activeSearchMobile: 'open-search-mobile',
  activeModalMobile: 'open-modal-mobile',
  bottomNav: '.header__bottom-nav',
  navArrow: '.nav-item__arrow',
  navItem: '.nav-item',
  navLink: '.nav-link',
  activeNav: 'active-nav',
  headerMobile: '.header__mobile',
  headerMobileBackLink: '.header__mobile-back-link',
  headerMobileBack: '.header__mobile-back',
  headerMobileClose: '.header__mobile-close',
  msgError: '.msg--error',
  megaMenu: '.mega-menu',
};
const {
  header,
  activeHeader,
  activeHeaderMobile,
  headerBurger,
  activeSearch,
  activeModal,
  headerSearch,
  searchForm,
  iconSearch,
  btnBook,
  btnBookMobile,
  headerBook,
  activeBook,
  scrolled,
  clearSearch,
  inputSearch,
  iconSearchMobile,
  activeSearchMobile,
  activeModalMobile,
  bottomNav,
  navArrow,
  navItem,
  navLink,
  activeNav,
  headerMobile,
  headerMobileBack,
  headerMobileBackLink,
  headerMobileClose,
  msgError,
  megaMenu,
} = classes;

@Plugin()
export default class Menu {
  init() {
    this.initState();
    this.initDOM();
    this.initEvents();
    this.addSportTitle();
    this.handleScroll();
    this.handleClearSearchForm();
    this.handleNavItemArrowClick();
    this.handleBackLinkClick();
    this.handleSubmitSearch();
    this.handleOutsideSearchClick();
    this.handleOutsideBtnBookClick();
    this.handleHeaderMobileCloseClick();
    $([this.$iconSearch, this.$btnBook]).each((_, el) => this.handleBtnBookClick(el));
    $([this.$iconSearchMobile, this.$btnBookMobile, this.$burger]).each((_, el) => {
      this.handleIconMobileClick(el);
    });
  }

  initState() {
    this.addState('isMenuActive', false);
    this.addState('isSearchActive', false);
    this.addState('isBookActive', false);
    this.addState('isModalActive', false);
    this.addState('isSearchMobileActive', false);
    this.addState('isModalMobileActive', false);
  }

  initDOM() {
    this.$burger = this.$element.find(headerBurger);
    this.$iconSearch = this.$element.find(iconSearch);
    this.$search = this.$element.find(headerSearch);
    this.$searchForm = this.$element.find(searchForm);
    this.$header = $(header);
    this.$btnBook = this.$element.find(btnBook);
    this.$btnBookMobile = this.$element.find(btnBookMobile);
    this.$headerBook = this.$element.find(headerBook);
    this.$iconSearchMobile = this.$element.find(iconSearchMobile);
    this.$clearSearch = this.$element.find(clearSearch);
    this.$bottomNav = this.$element.find(bottomNav);
    this.$headerMobile = this.$element.find(headerMobile);
    this.$headerMobileBack = this.$element.find(headerMobileBack);
    this.$headerMobileBackLink = this.$element.find(headerMobileBackLink);
    this.$headerMobileClose = this.$element.find(headerMobileClose);
    this.$inputSearch = this.$element.find(inputSearch);
    this.$msgError = this.$element.find(msgError);
  }

  initEvents() {
    this.addEvent(this.$burger, 'click', this.onBurgerClick);
    this.addEvent(this.$iconSearch, 'click', this.onIconSearchClick);
    this.addEvent(this.$btnBook, 'click', this.onBtnBookClick);
    this.addEvent(this.$iconSearchMobile, 'click', this.onIconSearchClick);
    this.addEvent(this.$btnBookMobile, 'click', this.onBtnBookClick);
  }

  onBurgerClick() {
    if (this.state.isMenuActive) {
      $(`.${activeNav}`).removeClass(activeNav);
    }
    if (!this.state.isMenuActive) {
      this.state.isMenuActive = !this.state.isMenuActive;
    }
    if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
    this.onExceptSearchMobileClick();
  }

  onIconSearchClick() {
    this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
    if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
    this.onModalActive();
    this.onIconSearchMobileClick();
  }

  onIconSearchMobileClick() {
    this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    this.onModalMobileActive();
  }

  onBtnBookClick() {
    this.state.isBookActive = !this.state.isBookActive;
    if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
    if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
    if (this.state.isSearchMobileActive) {
      this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    }
    this.onModalActive();
    this.onModalMobileActive();
  }

  onModalActive() {
    if (this.state.isSearchActive || this.state.isBookActive) this.state.isModalActive = true;
    if (!this.state.isSearchActive && !this.state.isBookActive) this.state.isModalActive = false;
  }

  onModalMobileActive() {
    if (this.state.isSearchActive || this.state.isBookActive) this.state.isModalMobileActive = true;
    if (!this.state.isSearchActive && !this.state.isBookActive) {
      this.state.isModalMobileActive = false;
    }
  }

  onExceptSearchMobileClick() {
    if (this.state.isSearchMobileActive) {
      this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
    }
    if (this.state.isModalMobileActive) {
      this.state.isModalMobileActive = !this.state.isModalMobileActive;
    }
  }

  handleScroll() {
    $win.on('scroll', () => {
      if ($doc.scrollTop() > 0) {
        this.$header.addClass(scrolled);
      } else {
        this.$header.removeClass(scrolled);
      }
    });
  }

  handleClearSearchForm() {
    this.$inputSearch.on('input', () => {
      if ($(this.$inputSearch).val().length > 0) {
        $(this.$clearSearch).show();
      }
      if ($(this.$inputSearch).val().length === 0) {
        $(this.$clearSearch).hide();
      }
    });

    this.$clearSearch.on('click', (e) => {
      const target = e.target.closest(clearSearch);
      if (target) {
        this.$element.find(inputSearch).val('');
        $(this.$clearSearch).hide();
        $(this.$inputSearch).trigger('focus');
      }
    });
  }

  handleSubmitSearch() {
    this.$searchForm.on('submit', (e) => {
      e.preventDefault();
      if ($(this.$inputSearch).val() === '') {
        $(this.$inputSearch).trigger('focus');
        $(this.$msgError).show();
      }
    });

    this.$inputSearch.on('input', () => $(this.$msgError).hide());
  }

  handleBtnBookArrow() {
    if ($(this.$headerBook).hasClass(activeBook)) {
      $body.addClass(activeBook);
      $(this.$btnBookMobile).addClass('active');
    } else {
      $body.removeClass(activeBook);
      $(this.$btnBookMobile).removeClass('active');
    }
  }

  handleIconMobileClick(el) {
    $(el).on('click', (e) => {
      const target = $(e.target).closest(el);
      if (!target.length) return;
      if (this.$header.hasClass(activeModalMobile)) {
        $body.addClass(activeHeaderMobile);
      } else {
        $body.removeClass(activeHeaderMobile);
      }
      this.handleBtnBookArrow();
    });
  }

  handleBtnBookClick(el) {
    $(el).on('click', (e) => {
      const target = e.target.closest(btnBook);
      if (!target) return;
      this.handleBtnBookArrow();
    });
  }

  handleNavItemArrowClick() {
    this.$bottomNav.on('click', (e) => {
      const target = e.target.closest(navArrow);
      if (!target) return;
      $(target).parent(navItem).addClass(activeNav);
      $(this.$headerMobileBack).css({ visibility: 'visible', opacity: 1 });
    });
  }

  handleBackLinkClick() {
    this.$headerMobileBackLink.on('click', (e) => {
      const target = e.target.closest(headerMobileBackLink);
      if (!target) return;
      $(navItem).each((_, el) => {
        $(el).removeClass(activeNav);
      });
      $(this.$headerMobileBack).css({ visibility: 'hidden', opacity: 0 });
    });
  }

  handleOutsideSearchClick() {
    $doc.on('click', (e) => {
      const target = e.target.closest(headerSearch) || e.target.closest(iconSearchMobile);
      if (target) return;
      if (this.state.isSearchActive) {
        if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
        if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
        if (this.state.isSearchMobileActive) {
          this.state.isSearchMobileActive = !this.state.isSearchMobileActive;
        }
        $body.removeClass(activeHeaderMobile);
        this.onModalActive();
        this.onModalMobileActive();
      }
    });
  }

  handleOutsideBtnBookClick() {
    $doc.on('touchstart click', (e) => {
      const target = e.target.closest(btnBook)
        || e.target.closest(btnBookMobile)
        || e.target.closest('.find-play');
      if ($(target)?.length) return;
      if (this.state.isBookActive) {
        if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
        if (this.state.isMenuActive) this.state.isMenuActive = !this.state.isMenuActive;
        $body.removeClass(activeHeaderMobile);
        this.onModalActive();
        this.handleBtnBookArrow();
      }
    });
  }

  addSportTitle() {
    $(this.$element).find(navItem).each((_, item) => {
      if (!$(item).find(megaMenu).get(0)) return;
      const markup = `<p class="mega-menu__heading">${$(item).find(navLink).text()}</p>`;
      $(item).find(megaMenu).prepend(markup);
    });
  }

  handleHeaderMobileCloseClick() {
    $(this.$headerMobileClose).on('click', (e) => {
      const target = e.target.closest(headerMobileClose);
      if (!target) return;

      if (this.state.isMenuActive) {
        $(`.${activeNav}`).removeClass(activeNav);
      }
      this.state.isMenuActive = !this.state.isMenuActive;
      if (this.state.isSearchActive) this.state.isSearchActive = !this.state.isSearchActive;
      if (this.state.isBookActive) this.state.isBookActive = !this.state.isBookActive;
      $(this.$headerMobileBack).css({ visibility: 'hidden', opacity: 0 });
      this.onExceptSearchMobileClick();
    });
  }

  watch = {
    isMenuActive(value) {
      $body.toggleClass(activeHeader, value);
    },
    isSearchActive(value) {
      this.$search.toggleClass(activeSearch, value);
    },
    isBookActive(value) {
      this.$headerBook.toggleClass(activeBook, value);
    },
    isModalActive(value) {
      this.$header.toggleClass(activeModal, value);
    },
    isSearchMobileActive(value) {
      this.$iconSearchMobile.toggleClass(activeSearchMobile, value);
    },
    isModalMobileActive(value) {
      this.$header.toggleClass(activeModalMobile, value);
    },
  }
}
