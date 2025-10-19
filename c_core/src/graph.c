#include <stdio.h>
#include <stdlib.h>
#include <float.h>
#include <string.h>
#include "../include/graph.h"


double compute_shortest_path(int n_nodes, Node nodes[], double **adj_matrix, int src, int dst, int *path_out, int *path_len){
double *dist = malloc(n_nodes*sizeof(double));
int *prev = malloc(n_nodes*sizeof(int));
int *visited = malloc(n_nodes*sizeof(int));
for(int i=0;i<n_nodes;i++){ dist[i]=DBL_MAX; prev[i]=-1; visited[i]=0; }
dist[src]=0.0;
for(int it=0;it<n_nodes;it++){
int u=-1; double best=DBL_MAX;
for(int i=0;i<n_nodes;i++) if(!visited[i] && dist[i]<best){best=dist[i]; u=i;}
if(u==-1) break;
visited[u]=1;
if(u==dst) break;
for(int v=0;v<n_nodes;v++){
if(adj_matrix[u][v]>0 && !visited[v]){
double alt = dist[u]+adj_matrix[u][v];
if(alt<dist[v]){dist[v]=alt; prev[v]=u;}
}
}
}
int tmp[MAX_NODES],cnt=0,cur=dst;
while(cur!=-1 && cur!=src){ tmp[cnt++]=cur; cur=prev[cur]; }
if(cur==src){ tmp[cnt++]=src; for(int i=0;i<cnt;i++) path_out[i]=tmp[cnt-1-i]; *path_len=cnt; }
else *path_len=0;
double total = (dist[dst]==DBL_MAX)?-1.0:dist[dst];
free(dist); free(prev); free(visited);
return total;
}
