<?php

    include_once '../../vendor/autoload.php';
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class JwtHandler{

        protected $jwt_secrect;
        protected $token;
        protected $issuedAt;
        protected $expire;
        protected $jwt;

        public function __construct(){

            date_default_timezone_set('Asia/Kathmandu');
            $this->issuedAt = time();

            $this->expire = $this->issuedAt + 3600;

            $this->jwt_secrect = "this_is_my_secrect";
        }

        public function jwtEncodeData($issuedBy, $data){

            $this->token = array(
                "issuedBy" => $issuedBy,
                "aud" => $issuedBy,
                "issuedAt" => $this->issuedAt,
                "expire" => $this->expire,
                "data" => $data
            );

            $this->jwt = JWT::encode($this->token, $this->jwt_secrect,'HS256');
            return $this->jwt;
        }

        public function jwtDecodeData($jwt_token){

            try{
                $decode = JWT::decode($jwt_token,new Key($this->jwt_secrect, 'HS256'));
                return array(
                    "data" => $decode->data
                );
            }catch(Exception $ex){
                return array(
                    "message" => $ex->getMessage()
                );
            }
        }
    }