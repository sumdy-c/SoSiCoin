class Header extends MC {
  constructor() {
    super();
  }

  render() {
    return $("<header>")
      .addClass("header-main")
      .append(
        $("<div>").addClass("header_logo").append(
            $('<span>').text('sosi'),
            $('<span>').addClass('header_logo_coin').text('COIN')
        ),
        $('<div>').addClass('header_title').text('Забери у завсегдаев Десанта, все их деньги!'),
      );
  }
}
