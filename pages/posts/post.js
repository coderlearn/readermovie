var a=require('../../data/data')
Page({

 
  data: {
     
   
  },


  onLoad: function (options) {
      
        
      
        
        this.setData({
          post_key:a.datalist
        })
      
  },

   haha:function(event){
       var postid=event.currentTarget.dataset.postid
     
       wx.navigateTo({
          url: '../posts-details/posts-details?postid='+postid
       
        })
   },
   collect:function(){
     console.log(1)
   }

   
 
}
    

)

