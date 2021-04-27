
var currentUrl=window.location.href;
var getHttp = currentUrl.split('/'); 

export const config = {
                    Api: getHttp[0]+'//smartfm.in/NSEIPLSERVICE/DashboardService/',
                    configurl : "https://smartfm.in/NSEIPLSERVICE",
                    submiturl : "https://smartfm.in/NSEIPLWEBANDMOBILEPORTAL/"
                }

export const GoogleMapsAPI = 'AIzaSyD3_Hu06k3bR2DJijbLHpcx2HGrD_uiB0E';
