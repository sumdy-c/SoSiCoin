class Balance extends MC {
    constructor() {
      super();
    }
  
    render() {
        return $("<div>").addClass('balance-container').append(
            $('<span>').addClass('icon').html('💰'),
            $('<span>').addClass('label').text('Balance:'),
            $('<span>').addClass('balance').attr('id', 'user-balance').text(`$${this.balance}!`)
          );
    }
  }