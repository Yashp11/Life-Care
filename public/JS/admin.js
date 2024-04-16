function loadcontent(content) {
    fetch(`/admin/${content}`)
        .then((response) => response.text())
        .then(html => {
            document.getElementById("content").innerHTML = html
            $(document).ready(function () {
                $('#appointment-table').DataTable();
            });
        })
        .catch(error => console.error("Error loading component:", error));
}

function data_delete(id, type) {
    if (confirm("This Data will delete permentally!!!")) {
        fetch(`/fetchData?id=${id}&type=${type}`).then(window.location.reload());
    }
}
function appo_update(id) {
    let status = document.getElementById(`statusSelect${id}`).value;
    fetch(`/updatedata?id=${id}&status=${status}`).then(window.location.reload());
}