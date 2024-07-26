document.addEventListener("DOMContentLoaded", () => {
  const authState = MC.createState("loading");

  $("#root").append(
    $.MC((state) => {
        const [auth] = state;

        console.log(auth);

        if (auth === "loading") {
          fetch("auth").then(async (res) => {
            const result = await res.json();

            if (result.status) {
              authState.set(result.status);
            }
          });
        }

        switch (auth) {
          case "loading": {
            return $("<div>");
          }
          case "UnAuthorized": {
            return $.MC(Auth, 'Auth');
          }
          case "authorized": {
            return $("<div>").append($.MC(Header, 'Header'), $.MC(Main, 'Main'), $.MC(Balance, 'Balance'));
          }
          default: {
            return $("<span>").text("Сломалось что-то вроде");
          }
        }
      }, [authState])
  );
});
