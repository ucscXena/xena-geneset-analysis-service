

Analysis service for storing analyzed and custom gene sets. 

Stores analysis from https://github.com/ucscXena/XenaGoWidget 

Generated here: https://github.com/ucscXena/XenaAnalysisService



## Installation
 
 ```bash
 $ yarn install
 ```
 
 ## Running the app
 
 ```bash
 # development
 $ yarn run start
 
 # watch mode
 $ yarn run start:dev
 
 # production mode
 $ yarn run start:prod
 ```
 
 ## Test
 
 ```bash
 # unit tests
 $ yarn run test
 
 # e2e tests
 $ yarn run test:e2e
 
 # test coverage
 $ yarn run test:cov
 ```

# Analysis Layer (R/Viper)

### Setup

      install.packages("BiocManager")
      install.packages("plumber")
      install.packages("viper")
      install.packages("Rook")
      install.packages("jsonlite")
      install.packages("R.utils")
      install.packages("stringr")

### Analysis 


    Rscript analysis-wrapper.R ./Xena_manual_pathways.gmt ./TCGA-CHOL_logtpm_forTesting.tsv ./test_outfile.tsv BPA
    
    Rscript analysis-wrapper.R  ./test-data/Xena_manual_pathways.gmt ./test-data/TCGA-CHOL_logtpm_forTesting.tsv ./test-data/test_outfile.tsv 
    
#### Server


      Rscript analysis-server.R
      curl -v -F tpmdata=@test-data/TCGA-CHOL_logtpm_forTesting.tsv -F gmtdata=@test-data/Xena_manual_pathways.gmt http://localhost:8000/bpa_analysis


### Web Server

Uses plumber: https://www.rplumber.io/  

    install.packages("plumber")
   
Run server:

    Rscript server.R
   
Test:

    curl "http://localhost:8000/echo
    curl "http://localhost:8000/echo?msg=hello
    curl --data "a=4&b=3" "http://localhost:8000/sum"
    curl --data '{"a":4, "b":5}' http://localhost:8000/sum
   


