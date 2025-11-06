function deleteProduct(button, productId) {

    if (!confirm('Tem certeza que deseja remover este produto?')) {
        return;
    }

    fetch(`/api/products/delete/` + productId, {
        method: 'DELETE',
        headers: {
        }
    })
        .then(response => {
            if (response.ok) {
                alert('Produto removido!');
                location.reload();

            } else {
                // Falha
                alert('Erro ao remover o produto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de rede ao tentar remover o produto.');
        });
}