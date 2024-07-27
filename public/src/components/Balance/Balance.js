class Balance extends MC {
  constructor() {
    super();
  }

  render(_, {userState}) {
    return $("<div>")
      .addClass("balance-container")
      .append(
        $("<span>").addClass("icon").html("💰"),
        $("<span>").addClass("label").text("Balance:"),
        $.MC((state) => {
          const [ user ] = state;
          if(!user) {
            return null;
          }
          return $("<span>")
            .addClass("balance")
            .attr("id", "user-balance")
            .text(`$${user.coins}!`);
        }, [userState])
      );
  }
}
