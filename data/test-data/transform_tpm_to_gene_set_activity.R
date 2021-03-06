# transform_tpm_to_gene_set_activity.R

# Usage:
# Rscript transform_tpm_to_gene_set_activity.R <genesets.gmt> <expression_logtpm.tsv> <outfile.tsv> ["BPA"]

# Inputs:
# genesets.gmt: Filepath to the file containing the gene sets in .gmt file format
# expression_logtpm.tsv: Filepath to the file containing gene expression data in log-transformed TPM, genes x samples
# outfile.tsv: Filepath to write output to
# one of: ["BPA"]: optional definition of gene set transformation method, default: "BPA"
# Output:
# gene set activity matrix, gene sets x samples, in .tsv format


# method "BPA" requires R Bioconductor package 'viper'
# to install 'viper' run the following commands
# if (!requireNamespace("BiocManager", quietly = TRUE))
#   install.packages("BiocManager")
# BiocManager::install("viper")


# Inputs for testing locally
#geneset_gmt_filepath <- "./Xena_manual_pathways.gmt"
#tmp_expr_data_filepath <- "./TCGA-CHOL_logtpm_forTesting.tsv"
#outfile <- "./test_outfile.tsv"
#analysis_method <- "BPA"

# get command line input
args <- commandArgs(trailingOnly=TRUE)
geneset_gmt_filepath <- args[1]
tmp_expr_data_filepath <- args[2]
outfile <- args[3]
if(length(args)>3){
  analysis_method <- args[4]
}else{
  analysis_method <- "BPA"
}


if(analysis_method == "BPA"){
  # only load viper package if method 'BPA' is used
  library(viper)
  
  # read in pathways and bring into right format for viper aREA function
  pws_list <- list()
  pws <- readLines(geneset_gmt_filepath)
  for(line in pws){
    linesplit <- strsplit(line,split="\t",fixed = T)[[1]]
    gs_name <- linesplit[1]
    gs_description <- linesplit[2]
    if(gs_description != ""){
      gs_name <- paste0(gs_name," (",gs_description,")")
    }
    gs_genes <- linesplit[3:length(linesplit),drop = F]
    
    likelihood <- rep(1,times=length(gs_genes))
    tfmode <- rep(1,times=length(gs_genes))
    names(tfmode) <- gs_genes
    
    gs_list <- list(tfmode = tfmode,likelihood = likelihood)
    pws_list[[gs_name]] <- gs_list
  }
  
  
  # read in expression data
  tpm <- as.matrix(read.table(tmp_expr_data_filepath,sep = "\t", header = T, row.names = 1, check.names = F))
  
  
  # transform gene expression to pathway activities
  nes <- aREA(tpm, pws_list, minsize = 2)$nes
  
  
  # write pathway activity matrix to files
  write.table(nes, file = outfile, quote = F, sep='\t', col.names = NA, row.names = T)
  
  
}else{
  print("analysis method has to be one of: BPA (default)")
}








