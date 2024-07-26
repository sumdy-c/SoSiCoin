class Main extends MC {
    constructor() {
      super();
    }
  
    render() {
        const pathAsset = '../../../assets/photos';

        return $('<main>').append(
            $('<div>').addClass('photo-container').append(
              $('<img>')
                .attr('src', `${pathAsset}/yana.jpg`)
                .attr('alt', 'Photo 1')
                .attr('id', 'photo-1'),
              $('<div>').addClass('name').text('Яна'),
              $('<div>').addClass('money').attr('id', 'money-1').text('$ 0')
            ),
            $('<div>').addClass('photo-container').append(
              $('<img>')
                .attr('src', `${pathAsset}/cheat.jpg`)
                .attr('alt', 'Photo 2')
                .attr('id', 'photo-2'),
              $('<div>').addClass('name').text('4iter'),
              $('<div>').addClass('money').attr('id', 'money-2').text('$ 0')
            ),
            $('<div>').addClass('photo-container').append(
              $('<img>')
                .attr('src',  `${pathAsset}/glhf.jpg`)
                .attr('alt', 'Photo 3')
                .attr('id', 'photo-3'),
              $('<div>').addClass('name').text('glhf'),
              $('<div>').addClass('money').attr('id', 'money-3').text('$ 0')
            ),
            $('<div>').addClass('photo-container').append(
              $('<img>')
                .attr('src', `${pathAsset}/mark.png`)
                .attr('alt', 'Photo 4')
                .attr('id', 'photo-4'),
              $('<div>').addClass('name').text('Макар (врёт что Марк)'),
              $('<div>').addClass('money').attr('id', 'money-4').text('$ 0')
            ),
            $('<div>').addClass('photo-container').append(
              $('<img>')
                .attr('src', `${pathAsset}/sosis.jpg`)
                .attr('alt', 'Photo 5')
                .attr('id', 'photo-5'),
              $('<div>').addClass('name').text('Сосиска (узнает же)'),
              $('<div>').addClass('money').attr('id', 'money-5').text('$ 0')
            )
          );
    }
  }
  