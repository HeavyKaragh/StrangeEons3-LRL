useLibrary( 'extension' ) ;

const componentList = new Array(
	'HeroPromo'
	, 'AllyPromo'
	, 'AttachmentPromo'
	, 'EventPromo'
	, 'EnemyPromo'
	, 'LocationPromo'
	, 'TreacheryPromo'
	, 'ObjectivePromo'
	, 'ObjectiveAllyPromo'
) ;

function getName(){ return @LRL-R ; }
function getDescription(){ return @LRL-R-description ; }
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
