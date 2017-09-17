var app=getApp()
var fff=require('../../unit/unit');
Page({
  

  data: {
    
  in_theaters:{},
    coming_soon:{},
    top250:{},
    show:true,
  
  },

 
  onLoad: function (options) { 

   console.log(fff.change)
  this. getdata('https://api.douban.com/v2/movie/in_theaters','in_theaters')

   this.getdata('https://api.douban.com/v2/movie/coming_soon','coming_soon')
  this.  getdata('https://api.douban.com//v2/movie/top250','top250')

  },

     getdata:function(url,settlekey,ttt){ 
      var movies=[];
       var that=this
       wx.request({
        url: url+'?start=0&count=3',        
        data:{},
        method:'GET',
        header:{
          "Content-Type":"application/xml"
        },
        

      success:function(res){
          // (res.data.title)
       
          var stars=[];
           var movies = res.data.subjects;
           for(var i in movies){
             var subject=movies[i];
             subject.rating.change=fff.change(subject.rating.stars);
             subject.changetitel=subject.title.substring(0,6)
           }
          movies.stars=stars;
           ttt=res.data.title;
           console.log(movies)
          
           var ready={}
           ready[settlekey]={
             movies:movies,
             title:ttt,
          
           }
     //   
        that.setData(ready)

    
        },
        

  
       })},
       onMoreTap:function(events){
         var cate=events.currentTarget.dataset.cate;
         console.log(cate)
          wx.navigateTo({
            url: 'more-movie/more-movie?cate='+cate,
          })
       },
       focus:function(events){
         var a=false

          this.setData({
            show:a
          })

       },
  
       confirm:function(events){
         var that=this;
        var text=events.detail.value;
       wx.request({
         url: 'https://api.douban.com/v2/movie/search?q='+text,
         data: {},
         method: 'GET',
         header: {
           "Content-Type": "application/xml"},
       
     
    
           success:function(res){
          
                 console.log(res)
            
                   var movies = res.data.subjects

                   for (var i in movies) {
                     var subject = movies[i];
                     subject.rating.change = fff.change(subject.rating.stars);
                     subject.changetitel = subject.title.substring(0, 6)
                   }

                   var ttt = res.data.title;
                   //    console.log(movies)
                   that.setData({
                     movies: movies,
               
                   })
    
        }})
        

  
       }
     

})