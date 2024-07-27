class Main extends MC {
  load;
  constructor() {
    super();
    this.load = super.state(false);
  }

  hit(person) {
    if(!this.load.get()) {
      this.load.set(true);

      fetch("hit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ person: person }),
      }).then(async (data) => {
        const result = await data.json();

        if(result.hit) {
          const data = result.hit.newCoins;
          MC.getCoins({
            isCheatCoins: data.isCheatCoins,
            isGLTFCoins: data.isGLTFCoins,
            isMakarCoins: data.isMakarCoins,
            isSosiskaCoins: data.isSosiskaCoins,
            isYanaCoins: data.isYanaCoins,
          })

          MC.User.set(result.hit.user);
        }

        this.load.set(false);
      });
    }
  }

  render(state) {
    const [coins] = state.global;
    const pathAsset = "../../../assets/photos";

    return $("<main>").append(
      $("<div>")
        .addClass("photo-container")
        .append(
          $("<img>")
            .attr("src", `${pathAsset}/yana.png`)
            .attr("alt", "Photo 1")
            .attr("id", "photo-1")
            .on('click', () => this.hit('yana')),
          $("<div>").addClass("name").text("Яна"),
          $("<div>").addClass("money").attr("id", "money-1").text(`$ ${coins.isYanaCoins}`)
        ),

      $("<div>")
        .addClass("photo-container")
        .append(
          $("<img>")
            .attr("src", `${pathAsset}/cheat.jpg`)
            .attr("alt", "Photo 2")
            .attr("id", "photo-2")
            .on('click', () => this.hit('cheat')),
          $("<div>").addClass("name").text("4iter"),
          $("<div>").addClass("money").attr("id", "money-2").text(`$ ${coins.isCheatCoins}`)
        ),

      $("<div>")
        .addClass("photo-container")
        .append(
          $("<img>")
            .attr("src", `${pathAsset}/glhf.jpg`)
            .attr("alt", "Photo 3")
            .attr("id", "photo-3")
            .on('click', () => this.hit('glhf')),
          $("<div>").addClass("name").text("glhf"),
          $("<div>").addClass("money").attr("id", "money-3").text(`$ ${coins.isGLTFCoins}`)
        ),

      $("<div>")
        .addClass("photo-container")
        .append(
          $("<img>")
            .attr("src", `${pathAsset}/mark.png`)
            .attr("alt", "Photo 4")
            .on('click', () => this.hit('mark'))
            .attr("id", "photo-4"),
          $("<div>").addClass("name").text("Макар (aka Марк)"),
          $("<div>").addClass("money").attr("id", "money-4").text(`$ ${coins.isMakarCoins}`)
        ),

      $("<div>")
        .addClass("photo-container")
        .append(
          $("<img>")
            .attr("src", `${pathAsset}/sosis.jpg`)
            .attr("alt", "Photo 5")
            .on('click', () => this.hit('sosis'))
            .attr("id", "photo-5"),
          $("<div>").addClass("name").text("Сосиска"),
          $("<div>").addClass("money").attr("id", "money-5").text(`$ ${coins.isSosiskaCoins}`)
        ),
    );
  }
}
