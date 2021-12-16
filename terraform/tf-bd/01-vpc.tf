// Declare network resources

resource "aws_vpc" "main" {
  cidr_block = "172.16.0.0/16"
  tags = {
    Name = "bd-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "bd-internet-gateway"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "bd-public-route-table"
  }
}

resource "aws_route" "public_internet_gateway" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "bd-private-route-table"
  }
}

module "nat" {
  source               = "./tf-aws-nat-instance"
  name                 = "bd-nat-instance"
  instance_type        = "t2.nano"
  public_subnet_id     = aws_subnet.public_1a.id
  private_subnet_cidrs = ["172.16.2.0/24"]
  ports                = [443, 53]
}

resource "aws_subnet" "public_1a" {
  cidr_block = "172.16.0.0/24"
  vpc_id = aws_vpc.main.id
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "bd-subnet-1a"
  }
}

resource "aws_subnet" "public_1b" {
  cidr_block = "172.16.1.0/24"
  vpc_id = aws_vpc.main.id
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true
  tags = {
    Name = "bd-subnet-1b"
  }
}

resource "aws_subnet" "private_1a" {
  cidr_block = "172.16.2.0/24"
  vpc_id = aws_vpc.main.id
  availability_zone = "us-east-1a"
  tags = {
    Name = "bd-subnet-private"
  }
}

resource "aws_route_table_association" "public-1a" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public-1b" {
  subnet_id      = aws_subnet.public_1b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private-1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = module.nat.route_table_id
}

resource "aws_security_group" "main_security_group" {
  name        = "bd-sg"
  description = "Allow All Ports Inbound and Outbound"

  vpc_id = aws_vpc.main.id
}

# Allow ALB to contact the ECS containers range ports
resource "aws_security_group_rule" "open-all-ingress" {
  type = "ingress"

  from_port = 0
  to_port   = 65535

  protocol = "tcp"

  description = "Allow traffic to containers"

  cidr_blocks = ["0.0.0.0/0"]

  # The security group to apply this rule to.
  security_group_id = aws_security_group.main_security_group.id
}

# Allow ALB to contact the ECS containers range ports
resource "aws_security_group_rule" "open-all-egress" {
  type = "egress"

  from_port = 0
  to_port   = 65535

  protocol = "tcp"

  description = "Allow traffic from containers"

  cidr_blocks = ["0.0.0.0/0"]

  # The security group to apply this rule to.
  security_group_id = aws_security_group.main_security_group.id
}