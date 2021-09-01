function getAPIUrl(){
    let url = 'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/data%2Fships.json?alt=media&token=8b1c4bcb-e12a-4173-961a-15748f077a06'
    return url
}

function getFlagUrl(navy){
    let navy_to_flagUrl = {
      'CN':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fcn.png?alt=media&token=fe0ef7fd-8706-4727-975a-044951396df1',
      'HMS':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fgb.png?alt=media&token=eba70870-494d-49f6-bb77-4d0576632dbb',
      'INS':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fin.png?alt=media&token=09b1ff47-41e9-407d-943a-5f3576607b42',
      'IT':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fit.png?alt=media&token=12caefc6-42dc-4357-ab6a-a4fad9089821',
      'JS':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fjp.png?alt=media&token=3ab5b89e-6cdd-47c2-b436-170072d07d15',
      'IJN':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fjp.png?alt=media&token=3ab5b89e-6cdd-47c2-b436-170072d07d15',
      'RF':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fru.png?alt=media&token=ac3a2ed0-0d62-4d95-bdad-d910e37b1ab1',
      'ROK':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fkr.png?alt=media&token=8adc8fbc-ced5-41de-b303-32d1fd5c645a',
      'USS':'https://firebasestorage.googleapis.com/v0/b/modern-warships.appspot.com/o/flags%2Fus.png?alt=media&token=c774636a-ba77-4a5f-a936-22e0af045a81'
    }
    if(navy_to_flagUrl[navy]){
        return navy_to_flagUrl[navy]
    } else {
        return ''
    }
}

function getShipPreviewUrlFacebook(ship_id){
    return 'https://www.facebook.com/sharer/sharer.php?u=https://modern-warships.web.app/preview/ship_' + ship_id + '.html'
}

export default {
    getAPIUrl,
    getFlagUrl,
    getShipPreviewUrlFacebook
}