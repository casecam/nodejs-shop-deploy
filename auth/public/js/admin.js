const buttons = document.querySelectorAll('.delBtn');

const deleteProduct = (event) => {
  const prodId = event.target.parentNode.querySelector('[name=productId]').value;
  const productElement = event.target.closest('article');

  fetch(`/admin/product/${prodId}`, {
    method: 'DELETE',
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.parentNode.removeChild(productElement);
    })
    .catch((err) => {
      console.error(err);
    });
};

buttons.forEach((button) => {
  button.addEventListener('click', deleteProduct);
});
