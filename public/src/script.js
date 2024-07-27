document.addEventListener("DOMContentLoaded", () => {
  const authState = MC.createState("loading");
  const userState = MC.createState(null);
  const notificationState = MC.createState(null, "notification");
  const coinsTargets = MC.createState({
    isCheatCoins: 0,
    isGLTFCoins: 0,
    isMakarCoins: 0,
    isSosiskaCoins: 0,
    isYanaCoins: 0,
  });

  MC.getNotify = (rType, rText) => {
    notificationState.set({ type: rType, text: rText });
  };

  MC.getCoins = (val) => {
    coinsTargets.set(val);
  }

  MC.getAuth = (val) => {
    authState.set(val);
  };

  MC.User = {
    get() {
      return userState.get();
    },

    set(user) {
      userState.set(user);
    },
  };

  console.log(
    "%cВЫЙДИ ИРОД!\n%cНЕ трать свое время мамин хацкер.\n%cЗаймись чем-то полезным, не бери пример с меня.",
    "color: green; font-size: 20px; font-weight: bold;",
    "color: blue; font-size: 16px;",
    "color: red; font-size: 16px;"
  );
  $("#root").append(
    $.MC(
      (state) => {
        const [notifi] = state;

        if (!notifi) {
          return null;
        }

        setTimeout(() => {
          notificationState.set(null);
        }, 2000);

        return $.MC(
          Notify,
          MC.Props({
            props: notifi,
          }),
          "Notify"
        );
      },
      [notificationState]
    ),

    $.MC(
      (state) => {
        const [auth] = state;

        if (auth === "loading") {
          fetch("auth").then(async (res) => {
            const result = await res.json();

            if (result.status) {
              MC.User.set(result.user);
              authState.set(result.status);
            }
          });
        }

        fetch("coins").then(async (response) => {
          const data = await response.json();

          if (data) {
            coinsTargets.set({
              isCheatCoins: data.coins.isCheatCoins,
              isGLTFCoins: data.coins.isGLTFCoins,
              isMakarCoins: data.coins.isMakarCoins,
              isSosiskaCoins: data.coins.isSosiskaCoins,
              isYanaCoins: data.coins.isYanaCoins,
            });
          }
        });

        switch (auth) {
          case "loading": {
            return $("<div>");
          }
          case "UnAuthorized": {
            return $.MC(Auth, "Auth");
          }
          case "authorized": {
            return $("<div>").append(
              $.MC(Header, "Header"),
              $.MC(
                Main,
                MC.Props({
                  state: [coinsTargets]
                }),
                "Main"
              ),
              $.MC(
                Balance,
                MC.Props({
                  props: { userState: userState },
                }),
                "Balance"
              )
            );
          }
          default: {
            return $("<span>").text("Сломалось что-то вроде");
          }
        }
      },
      [authState]
    )
  );
});
