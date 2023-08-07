useLibrary( 'extension' ) ;

const componentList = new Array(
	'Enemy'
//	, 'EnemyPromo'
	, 'Location'
//	, 'LocationPromo'
	, 'Objective'
//	, 'ObjectivePromo'
	, 'ObjectiveAlly'
//	, 'ObjectiveAllyPromo'
	, 'SideQuest'
	, 'Treachery'
//	, 'TreacheryPromo'
) ;

function getName(){ return @LRL-E ; }
function getDescription(){ return @LRL-E-description ; }
function getVersion(){ return 2.0 ; }

function initialize(){
	if( Game.get('LRL') == null ){
		Eons.log.warning( "TheLordOfTheRingsLCG-E can't find TheLordOfTheRingsLCG" ) ;
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
