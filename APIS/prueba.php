<?php
$content_type = 'text/plain';
try{
    if (!empty($_POST)) {
        if(isset($_POST['doc_type']) || isset($_POST['doc_number'])) {
            $doc_type = $_POST['doc_type'];
            $doc_number = $_POST['doc_number'];
            
            $referer = 'https://apis.net.pe/consulta-dni-api';
            $url = 'https://api.apis.net.pe/v1/dni?numero=';
        
            if ($doc_type == 'ruc') {
                $referer = 'http://apis.net.pe/api-ruc';
                $url = 'https://api.apis.net.pe/v1/ruc?numero=';
            }
        
            $headers = [
                'Referer: ' . $referer,
                'Authorization: Bearer apis-token-1.aTSI1U7KEuT-6bbbCguH-4Y8TI6KS73N'
            ];
        
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $url . $doc_number,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => $headers,
            ));
        
            $response = curl_exec($curl);
           $content_type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
            $status = curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
            curl_close($curl);
        }
    }else{
        $status = 400;
        throw new Exception('Error: datos no enviados');
    }
}catch (\Throwable $th) {
    $response = json_encode([
        'status' => $status,
        'message' => $th->getMessage()
    ], JSON_PRETTY_PRINT);
    $content_type = 'application/json';
}finally{
    http_response_code($status);
    header("Content-Type: $content_type");
    echo $response;
};


