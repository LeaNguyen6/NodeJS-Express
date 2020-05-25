var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sessionsSchema = new Schema({
 // cart: Schema.Types.Mixed
  cart: [{
    bookId:{type:Schema.Types.ObjectId,ref: "Books" } ,
    qtt: { type: Number, default: 0 },
  }]
});

// khai bao model : tên model, dùng schema nào, tên collection
var Sessions = mongoose.model('Sessions', sessionsSchema,'sessions');

module.exports=Sessions