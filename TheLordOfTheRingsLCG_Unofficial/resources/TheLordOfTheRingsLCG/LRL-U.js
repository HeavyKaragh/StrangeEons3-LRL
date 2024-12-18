useLibrary( 'extension' ) ;

const componentList = new Array(
	'Gift'
	, 'Haven'
	, 'Presence'
	, 'Occurrence'
	, 'Adventure'
) ;

function getName(){ return @LRL-U ; }
function getDescription(){ return @LRL-U-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
        Eons.log.warning( @LRL-R+' '+@LRL-ExtensionCantFind) ;
    }else{
        for(
            let index = 0 ; 
            index < componentList.length ; 
            index++
        ){  
            ClassMap.add( 'TheLordOfTheRingsLCG/'+componentList[index]+'/component.classmap' );
        }
    }
}
