class Header extends MC {
  constructor() {
    super();
  }

  render() {
    const userName = MC.User.get().userName;

    return $("<header>")
      .addClass("header-main")
      .append(
        $("<div>").addClass("header_logo").append(
            $('<span>').text('sosi'),
            $('<span>').addClass('header_logo_coin').text('COIN')
        ),
        $('<div>').addClass('header_title').text('Забери у завсегдаев Десанта, все их деньги!'),
        $('<div>').append(
          $('<span>').css({
            'margin-right': '30px',
            'padding': '7px',
            'border-radius': '10px',
            'background-color': 'green',
          }).text(userName),
          $('<span>').addClass('header_logout').on('click', () => {
          fetch('logout').then(() => {
            MC.getAuth('loading');
          });
        }).text('Выйти'))
      );
  }
}
