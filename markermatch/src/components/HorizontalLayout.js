import CourseCard from '../components/CourseCard';

function HorizontalLayout() {
  return (
    <div style={{display:'flex',justifyContent:'center', flexWrap: 'wrap', overflow:'scroll', margin:"0 10vw"}}>
      <div className="p-2"><CourseCard /></div>
      <div className="p-2"><CourseCard /></div>
      <div className="p-2"><CourseCard /></div>
      <div className="p-2"><CourseCard /></div>
    </div>
  );
}

export default HorizontalLayout;