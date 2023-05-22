let contentArr = [];
async function getShow(search) {
  const shows = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${search}`
  );
  const urls = []
  const showEps = []
  for (let i = 0; i < shows.data.length; i++) {
    // let $newImg = $("<img>").attr("src", shows.data[i].show.image.medium);
    const showId = shows.data[i].show.id
    let eps = await axios.get(`http://api.tvmaze.com/shows/${showId}/episodes`);
    if(showEps.push(eps.data.length))
    {
      urls.push([])
      for(let j = 0; j < eps.data.length; j ++)
      {
        urls[i].push(eps.data[j].url)
      }
    }
    contentArr.push(showId);
    $("body").append(
      `<div class="content">
    ${
      shows.data[i].show.image !== null
        ? `<img src="${shows.data[i].show.image.medium}"></img>`
        : `<img src="coming-soon.jpg.jpg"></img>`
    }
        <a href="${shows.data[i].show.url}">show!</a>
        ${shows.data[i].show.name}
        <br>
        ${urls.map((url, i) => {
          let links = "";
          for (let y = 0; y < url[i].length; y++) {
            links += url[i][y]; // Concatenate each link
          }
          return `<div style="display: block;"><a href="${links}">${links}</a></div>`;
        }).join("")}
    </div>
    <br>`
    );
    // <br>
    // ${urls.map(url => `<br><div style="display: block;"> <p>${url[i]}</p></div>`)}
    // <br>
  }
}

$("button.submit").on("click", function (e) {
  e.preventDefault();
  if (contentArr.length > 0) {
    console.log("contentArr is more than 0");
    $("div.content").remove();
  }
  try {
    getShow($("input.search").val());
    if(contentArr.length > 0)
    {
        console.log('works')
    }
  } catch {
    alert("does not work");
  }
});
