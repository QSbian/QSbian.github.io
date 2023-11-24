<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .backgd{

            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 0;
            animation: backgrd 20s 0s linear infinite;
        }
        
        div{
            display: flex;
            justify-content: center;
        }

        input{
            width: 300px;
            height: 30px;
            position: absolute;
            top: 45%;
            z-index: 1;
            margin: auto;
            border-radius: 8px;

        }
        button{
            height: 35px;
            position:absolute;
            top: 45%;
            z-index: 1;
            right: 34%;
            border-radius: 8px;
        }
        button:hover{
            background-color: pink;
        }

        @keyframes backgrd {
            10%{
                background-image: url(https://img1.baidu.com/it/u=2929710579,3996007340&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            20%{
                background-image: url(https://hbimg.huabanimg.com/005c46a1ac9182e0032da1dea018d65d068a1789353c8-sq5mOo_fw658);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            30%{
                background-image: url(https://img1.baidu.com/it/u=656623292,2245164793&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            40%{
                background-image: url(https://img0.baidu.com/it/u=1392236192,1385822212&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            50%{
                background-image: url(https://img1.baidu.com/it/u=2607421435,3103445332&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            60%{
                background-image: url(https://img1.baidu.com/it/u=3518132070,368873898&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            70%{
                background-image: url(https://img0.baidu.com/it/u=281809113,3813738604&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            80%{
                background-image: url(https://img0.baidu.com/it/u=2926522521,2114530697&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            90%{
                background-image: url(https://up.enterdesk.com/edpic/d2/90/7a/d2907a49a38c498483240eb2c0d0f246.jpg);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
            100%{
                background-image: url(https://up.enterdesk.com/edpic_source/29/29/94/292994eea1a2bcafc11f318d75fa4ac4.jpg);
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
        }
    </style>
</head>
<body>
    <div class="backgd"></div>
    <div>
        <input type="text">
        <button><a href="https://xinzhuobu.com/wp-content/uploads/2022/09/20220928002th.jpg">千万别点</a></button>
    </div>
</body>
</html>
