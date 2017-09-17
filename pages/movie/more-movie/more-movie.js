
var fff = require('../../../unit/unit');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        cate:{},
        n:0,
        current:{},
       url:'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var a=options.cate
     this.setData({
       cate:a
     })
     switch(a){
       case'正在上映的电影-北京':
       var that=this
         var url ='https://api.douban.com/v2/movie/in_theaters'
         that.data.url = url;
         wx.request({
           url: url ,
           data: {},
           method: 'GET',
           header: {
             "Content-Type": "application/xml"
           },

          
           success: function (res) {
              // console.log(res.data)
                var movies=res.data.subjects
               
            for (var i in movies) {
               var subject = movies[i];
               subject.rating.change = fff.change(subject.rating.stars);
               subject.changetitel = subject.title.substring(0, 6)
             }
        
            var ttt = res.data.title;
         //    console.log(movies)
             that.setData({
               movies:movies,
                   current: movies
             })

          /*   var ready = {}
             ready[settlekey] = {
               movies: movies,
               title: ttt,

             }
             //   
             that.setData(ready)*/


           }})
           break
       case'即将上映的电影':
       var that=this
         
         var url = 'https://api.douban.com/v2/movie/coming_soon'
         that.data.url=url;
         wx.request({
           url: url,
           data: {},
           method: 'GET',
           header: {
             "Content-Type": "application/xml"
           },


           success: function (res) {
          //   console.log(res.data)
             var movies = res.data.subjects

             for (var i in movies) {
               var subject = movies[i];
               subject.rating.change = fff.change(subject.rating.stars);
               subject.changetitel = subject.title.substring(0, 6)
             }

             var ttt = res.data.title;
           //  console.log(movies)
             that.setData({
               movies: movies,
                current:movies
             })

             /*   var ready = {}
                ready[settlekey] = {
                  movies: movies,
                  title: ttt,
   
                }
                //   
                that.setData(ready)*/


           }
         })
         break
       case'豆瓣电影Top250':
       var that=this
         var url = 'https://api.douban.com//v2/movie/top250'
         that.data.url = url;
         wx.request({
           url: url,
           data: {},
           method: 'GET',
           header: {
             "Content-Type": "application/xml"
           },


           success: function (res) {
            // console.log(res.data)
             var movies = res.data.subjects

             for (var i in movies) {
               var subject = movies[i];
               subject.rating.change = fff.change(subject.rating.stars);
               subject.changetitel = subject.title.substring(0, 6)
             }

             var ttt = res.data.title;
        //     console.log(movies)
             that.setData({
               movies: movies,
               current: movies
             })

             /*   var ready = {}
                ready[settlekey] = {
                  movies: movies,
                  title: ttt,
   
                }
                //   
                that.setData(ready)*/


           }
         })
         break
     }
  },

  onReady: function () {
   
    
       wx.setNavigationBarTitle({
         title:this.data. cate,
       })
  },
  lower:function(event){
    
var that=this
that.data.n = that.data.n+20
    var a=event.currentTarget.dataset.cate
    var url;
    switch(a){
      case '正在上映的电影-北京':
        url = 'https://api.douban.com/v2/movie/in_theaters'
      break;
      case '豆瓣电影Top250':
        url = 'https://api.douban.com/v2/movie/top250'
      break;
      case '即将上映的电影':
       url = 'https://api.douban.com/v2/movie/coming_soon'
      break;

    }
    wx.request({
      url: url + '?start=' + that.data.n +'&count=20',
      data: {},
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },


      success: function (res) {
      //  console.log(res.data)
        var movies = res.data.subjects
      
        for (var i in movies) {
          var subject = movies[i];
          subject.rating.change = fff.change(subject.rating.stars);
          subject.changetitel = subject.title.substring(0, 6)
        }

        var ttt = res.data.title;
        movies = that.data.current.concat(movies)
        console.log(movies)
        that.setData({
          movies: movies,
         current:movies
        })

        /*   var ready = {}
           ready[settlekey] = {
             movies: movies,
             title: ttt,
 
           }
           //   
           that.setData(ready)*/


      }
    })

  },
       onPullDownRefresh:function(event){
         var a = this.data.url 
        var that=this
       
         wx.request({
           url: a,
           data: {},
           method: 'GET',
           header: {
             "Content-Type": "application/xml"
           },


           success: function (res) {
             // console.log(res.data)
             var movies = res.data.subjects

             for (var i in movies) {
               var subject = movies[i];
               subject.rating.change = fff.change(subject.rating.stars);
               subject.changetitel = subject.title.substring(0, 6)
             }

             var ttt = res.data.title;
             //     console.log(movies)
             that.setData({
               movies: movies,
               current: movies
             })

             /*   var ready = {}
                ready[settlekey] = {
                  movies: movies,
                  title: ttt,
   
                }
                //   
                that.setData(ready)*/


           }
         })
       },
       ondetails:function(events){
          var id=events.currentTarget.dataset.id;
          console.log(id)
            wx.navigateTo({
              url: '../movie-detail/movie-detail?id='+id,
            })
       }
})