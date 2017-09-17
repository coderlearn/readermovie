// posts-details.js
var b=require('../../data/data')
var app=getApp()
Page({

  data: {
    
  },


  onLoad: function (options) {
    var that = this
    var n=1;
    var a=options.postid;
    var current;
    var d = b.datalist[a].music.coverImg
    this.setData({
      post_key: b.datalist[a]
    })
       wx.onBackgroundAudioPlay(function () {
         if (app.globalData.g_music ){ 
        n++;
        current = b.datalist[a].music.coverImg
        b.datalist[a].isplaying = true
        b.datalist[a].music.coverImg = b.datalist[app.globalData.g_music].music.coverImg
        console.log(current)
        console.log(b.datalist[a].music.coverImg)}
      else{
       
        if(n%2==0){
          b.datalist[a].music.coverImg=current
          console.log(current)
         n++}
      }
      that.setData({
        post_key: b.datalist[a]
      })
        b.datalist[a].isplaying=true
        that.setData({
          post_key: b.datalist[a]
        })
      })
      wx.onBackgroundAudioPause(function () {
        b.datalist[a].isplaying = false
        that.setData({
          post_key: b.datalist[a],

        })
      })
      console.log(app.globalData.g_music)
   
  
  },
   
    
    

  onMusicTap:function(event){
 
    var a = event.currentTarget.dataset.postbd
    
    var isplaying = b.datalist[a].isplaying;
  
    if(isplaying){    
        wx.pauseBackgroundAudio()
     
      isplaying=false
      app.globalData.g_music = null
     }
    else{
    wx.playBackgroundAudio({
      dataUrl: b.datalist[a].music.url,
      title: b.datalist[a].music.title,
      coverImg:b.datalist[a].music.coverImg
    } )
    isplaying=true;
    app.globalData.g_music = a
    }
    b.datalist[a].isplaying=isplaying
  
    this.setData({
      post_key:b.datalist[a],
   
    })
   
  },


  collect:function(event){
    var that=this;
    var c = event.currentTarget.dataset.postid
 
    var panduan = b.datalist[c].panduan;
      if(panduan){
          panduan=false
         wx.showToast({
            title: '取消收藏', image:"/images/icon/collection-anti.png"
           
          })
     
      }
      else{
             panduan=true
             wx.showToast({
               title: '收藏',
               image:'/images/icon/collection.png'

             })
            
      }
       b.datalist[c].panduan=panduan;

       
       that.setData({
         post_key: b.datalist[c]
       } )
    },

       share:function(){
          var that=this
         wx.showActionSheet({ 
           
           itemList: ['A', 'B', 'C'],
           success:function(res){
            wx.showModal({
              title: 'aa',
              content: 'aaa',
            })
           },
       
           
         })
       }

})