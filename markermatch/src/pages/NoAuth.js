function NoAuth() {
    return (
      <>
        <div class="mainBody" style={{display:'flex',justifyContent:'center', flexWrap: 'wrap', overflow:'scroll', margin:"0 10vw"}}>
          <h2>Not Authorised</h2>
        </div>
        <div class="mainBody" style={{display:'flex',justifyContent:'center', flexWrap: 'wrap', overflow:'scroll', margin:"0 10vw"}}>
            <a href="/"><h4>Return Home</h4></a>
        </div>
      </>
    );
  }

export default NoAuth