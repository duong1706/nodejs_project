const root=location.protocol+"//"+location.host
$('.addCart').click(function(event) {
    event.preventDefault()
    const href = this.href
    $.ajax({
        url: href,
        type: 'get',
        data: {},
        success: function(data) {
            swal("Add successful!", "continute!", "success")
            $('#infoNumber').load(root + ' #numberCart')
        }
    })
})

$('.changeCart').on('submit', function(event) {
    event.preventDefault()
    const action = $(this).attr('action')
    const href = root + action
    const data = $(this).attr('data-id').split('/')
    const id = data[0]
    const type = data[1]
    const qty = '#qty' + id
    const item = '#item_' + id
    $.ajax({
        url: href,
        type: 'put',
        data: {},
        success: function(data) {
            $('#' + id).load(root + "/cart " + qty)
            $("#total1").load(root + "/cart #total2")
            $('#infoNumber').load(root + ' #numberCart')
            if ($(qty).text() == 1 && type == "reduce") {
                swal("Delete successfully", "continute!", "success")
                $(item).empty() 
            } 
        }
    })
})

$('.deleteCart').on('submit', function(event) {
    event.preventDefault()
    const action = $(this).attr('action')
    const href = root + action
    const item = '#item_' + $(this).attr('data-id')
    $.ajax({
        url: href,
        type: 'delete',
        data: {},
        success: function(data) {
            swal(data, "continute!", "success")
            $("#total1").load(root + "/cart #total2")
            $('#infoNumber').load(root + ' #numberCart')
            $(item).empty()
        }
    })
})

