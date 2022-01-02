var app = new function() {
  this.el = document.getElementById('movies');

  this.movies = [];
  
  this.FetchAll = function() {
    var data = '';

    if (this.movies.length > 0) {
      for (i = 0; i < this.movies.length; i++) {
        data += '<tr>';
        data += '<td>'+(i+1)+". " + this.movies[i] + '</td>';
        data += '<td><button onclick="app.Edit(' + i + ')"  class="btn btn-warning">Edit</button></td>';
        data += '<td><button onclick="app.Delete(' + i + ')"  class="btn btn-danger">Delete</button></td>';
        data += '</tr>';
      }
    }

    this.Count(this.movies.length);
    return this.el.innerHTML = data;
  };

  this.Add = function () {
    el = document.getElementById('add-todo');
    // Get the value
    var movie = el.value;

    if (movie) {
           
      this.movies.push(movie.trim())
      localStorage.setItem('Movies', JSON.stringify(this.movies));
      
      el.value = '';
      
      this.FetchAll();
    }
  };

  this.Edit = function (item) {
    var el = document.getElementById('edit-todo');
    
    el.value = this.movies[item];
    
    document.getElementById('edit-box').style.display = 'block';
    self = this;  
          

    document.getElementById('save-edit').onsubmit = function() {
      
      var movie = el.value;

      if (movie) {
        
        self.movies.splice(item, 1, movie.trim());
         localStorage.setItem('Movies', JSON.stringify(self.movies));
        
        self.FetchAll();
        
        CloseInput();
      }
    }
  };

  this.Delete = function (item) {
    
    this.movies.splice(item, 1);
    localStorage.setItem('Movies', JSON.stringify(this.movies));
    console.log(item, this.movies); 
    
    
    this.FetchAll();
  };

  this.Count = function(data) {
    var el   = document.getElementById('counter');
    var name = 'Movies';

    if (data) {
        if(data ==1){
            name = 'Movie'
        }
      el.innerHTML = data + ' ' + name ;
    } 
    else {
      el.innerHTML = 'No ' + name;
    }
  };

  
  this.Storage = function() {
      var mov = JSON.parse(localStorage.getItem('Movies'));
      if(mov !== null) {
        console.log("done");
        this.movies = mov;    
        console.log(this.movies);
        this.FetchAll();
      }
  };
  this.Storage();
}

app.FetchAll();

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}
  