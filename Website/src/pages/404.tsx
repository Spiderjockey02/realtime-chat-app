import Error from 'next/error';
export default function error404() {
	return <Error statusCode={404}/>;
}
