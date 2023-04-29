import {HeaderDocsType} from '../../types/docs'

export default function HeaderDocs({header}: HeaderDocsType){
	return (
		<>
			<h3>{header ? header : 'Documentation Explorer'}</h3>
		</>
	)
}