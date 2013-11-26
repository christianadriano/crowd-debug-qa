function insertSort(Alist){
	var Alist = [3,1,0,2];
    for(var j=1;j<Alist.length;j++){
        var key = Alist[j];
        var i=j-1;
        while(i>0){
            Alist[i+1]=Alist[i];
            if(Alist[i]<key){    
                i=0;  
            }
            else{
                i=i-1;
            }
        }
        Alist[i+1]=key;        
    }
    return Alist;    
}