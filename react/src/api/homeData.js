import myajax from '@/tool/myajax.js';
export default {
    goodsList(cb){
        const config={
            url:"http://localhost:3000/api/aaaaaa",
            options:{},
            success:(data)=>{
                cb(data)
            }
        };
        myajax.fetch(config);
    }
}



