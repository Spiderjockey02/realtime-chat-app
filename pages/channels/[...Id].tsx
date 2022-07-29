import { useRouter } from 'next/router'


function MyApp() {
  const router = useRouter()
  console.log(router)
  console.log(router.query)
  const { Id } = router.query
  return (
    <div>
      <p>{Id}</p>
      <p>{Id}</p>
    </div>
  );
}

export default MyApp;
