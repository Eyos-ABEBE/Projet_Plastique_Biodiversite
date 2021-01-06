function myFunction() {
    let plastic_polution_link = 'https://services6.arcgis.com/C0HVLQJI37vYnazu/arcgis/rest/services/Estimate_of_Plastic_Pollution_in_the_World_s_Oceans_1_01_4_75/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';
    d3.json(plastic_polution_link).then(function(data) {
        let json_res = {}
        data.features.forEach(el => {

            let TOTAL__G_KM_ = el.attributes.WD1__G_KM_ + el.attributes.WD2__G_KM_ + el.attributes.WD3__G_KM_ + el.attributes.WD4__G_KM_;
            json_res[el.attributes.OBJECTID] = {
                    'LATITUDE': el.attributes.LATITUDE,
                    'LONGITUDE': el.attributes.LONGITUDE,
                    'TOTAL__G_KM_': TOTAL__G_KM_
                }
                /**console.log('OBJECTID : ' + el.attributes.OBJECTID + ' LATITUDE : ' + el.attributes.LATITUDE + ' LONGITUDE : ' + el.attributes.LONGITUDE +
                    ' WD1__G_KM_ : ' + el.attributes.WD1__G_KM_ + ' WD2__G_KM_ : ' + el.attributes.WD2__G_KM_ +
                    ' WD3__G_KM_ : ' + el.attributes.WD3__G_KM_ + ' WD4__G_KM_ : ' + el.attributes.WD4__G_KM_ +
                    ' TOTAL__G_KM_ : ' + TOTAL__G_KM_) **/
        });

        console.log(json_res)
        var str = JSON.stringify(json_res, null, 2);
        document.getElementById("demo").innerHTML = "<pre>" + str + "</pre>";

    });
}

function replace(show) {
    elmts = document.getElementsByClassName('visualisation__bottom');
    for (var i = 0; i < elmts.length; i++) {
        elmts[i].style.display = 'none';
    }
    document.getElementById(show).style.display = "block";
}