// movie-detail.js
var fff = require('../../../unit/unit');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
  },

 
  onLoad: function (options) {
    var that=this
  var id=options.id;
  var url = "https://api.douban.com/v2/movie/subject/"+id
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
  },
  success:function(res){
        
        var movies=res.data;
        movies.rating.change = fff.change(movies.rating.stars);
        movies.country=movies.countries[0];
        movies.director=movies.directors[0]
        movies.caaa=fff.a(movies.casts)
        movies.castinfo=fff.b(movies.casts)
        movies.generes=movies.genres.join('、 ')
        console.log(movies)
     
     that.setData({
       movie:movies
     })
  }
   } )
 
 
  }


})