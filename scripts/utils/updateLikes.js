export function updateLikes(span, totalLikes, displaLikes) {
  let actualLike = parseInt(span.textContent);
  console.log(span.getAttribute("data-incremented"));
  console.log(actualLike);

  if (span.getAttribute("data-incremented") === "true") {
    span.removeAttribute("data-incremented");
    actualLike -= 1;
    totalLikes -= 1;
    span.textContent = actualLike;
  } else {
    span.setAttribute("data-incremented", "true");
    actualLike += 1;
    totalLikes += 1;
    span.textContent = actualLike;
  }
  displaLikes.innerHTML = `${totalLikes} &#9829`;
}
