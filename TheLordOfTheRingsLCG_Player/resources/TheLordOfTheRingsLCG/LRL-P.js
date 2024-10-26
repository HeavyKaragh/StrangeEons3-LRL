useLibrary( 'extension' ) ;

const componentList = new Array(
	'Ally'
	, 'Attachment'
	, 'Contract'
	, 'Event'
	, 'Hero'
	, 'SideQuestPlayer'
	, 'Treasure'
) ;

function getName(){ return @LRL-P ; }
function getDescription(){ return @LRL-P-description ; }
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
