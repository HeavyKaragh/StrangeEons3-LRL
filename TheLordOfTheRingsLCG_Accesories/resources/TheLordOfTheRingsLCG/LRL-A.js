useLibrary( 'extension' ) ;

const componentList = new Array(
	'QuestSheet'
	, 'Presentation'
	, 'PresentationExtra'
	, 'PresentationAlternate'
	, 'RulesCard'
	, 'Scenario'
	, 'EncounterSet'
	, 'Divider'
	, 'DividerHorizontal'
	, 'DividerCard'
) ;

function getName(){ return @LRL-A ; }
function getDescription(){ return @LRL-A-description ; }
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
