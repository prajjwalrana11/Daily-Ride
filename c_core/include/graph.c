#ifndef GRAPH_H
#define GRAPH_H


#define MAX_NODES 1000


typedef struct {
int id;
double lat;
double lng;
} Node;


double compute_shortest_path(int n_nodes, Node nodes[], double **adj_matrix, int src, int dst, int *path_out, int *path_len);


#endif // GRAPH_H
