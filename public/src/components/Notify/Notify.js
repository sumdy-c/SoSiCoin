class Notify extends MC {
    constructor() {
      super();
    }
  
    render(_, { type, text }) {
      return $("<div>")
        .addClass(`notify-container notify-${type}`)
        .text(text);
    }
  }