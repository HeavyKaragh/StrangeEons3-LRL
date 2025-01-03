useLibrary( 'extension' ) ;

const componentList = new Array(
	'Quest'
	, 'Setup'
	, 'Campaign'
) ;

function getName(){ return @LRL-V ; }
function getDescription(){ return @LRL-V-description ; }
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
