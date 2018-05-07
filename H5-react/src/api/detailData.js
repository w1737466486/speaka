import myajax from '@/tool/myajax.js';

export default {
    goodsData(goodsID,cb){
        const config={
            url:"http://localhost:3000/api/aaaaaa/aaaaaadetail?goodsID="+goodsID,
            options:{},
            success:(data)=>{
                cb(data)
            }
        };
        myajax.fetch(config);
    }
}



