useLibrary( 'extension' ) ;

const componentList = new Array(
	'Enemy'
	, 'Location'
	, 'Objective'
	, 'ObjectiveAlly'
	, 'SideQuest'
	, 'Treachery'
) ;

function getName(){ return @LRL-E ; }
function getDescription(){ return @LRL-E-description ; }
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
