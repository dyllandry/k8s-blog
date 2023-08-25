We applied an ingress-nginx kubectl config file to our cluster to provision a load balancer and an ingress controller so traffic could enter our cluster and be routed to our different pods via their cluster ip services. https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

To start ingress stuff:

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

To stop ingress stuff:

```
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

You can use `skaffold dev` to deploy all the kubernetes objects, and just ctrl-c the shell with the running process. 
