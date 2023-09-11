import HorizontalLayout from '../components/HorizontalLayout';

function Homepage() {
    return (
      <>
        <div class="mainBody" style={{width: '100vw', zIndex: 0, position:'absolute', overflow:'scroll'}}>
          <HorizontalLayout />
        </div>
      </>
    );
  }

export default Homepage